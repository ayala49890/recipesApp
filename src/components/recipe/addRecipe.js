import { Input } from "@mui/base"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, useFieldArray } from 'react-hook-form'
import { Button, Form } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { addRecipe, editRecipe } from "../service/serviceRecipe"
import axios from "axios"
import { Message } from "@mui/icons-material"
import Swal from "sweetalert2"


export default function AddRecipe() {
    const schema = yup.object({
        CategoryId: yup.number().integer().required().min(1, "חובה לבחור קטגוריה"),
        Name: yup.string().required("חובה להכניס שם"),
        Img: yup.string(),
        Duration: yup.string().matches(/^[1-9]\d*$/, "הכנס מספר דקות").required(" שדה חובה"),
        Difficulty: yup.string().required().min(1, "חובה לבחור רמת קושי"),
        Description: yup.string().required("חובה להכניס תיאור"),
        Instructions: yup.array().of(yup.string().required()),
        Ingrident: yup.array().of(
            yup.object().shape({
                Name: yup.string().required("הכנס שם"),
                Count: yup.number("כמות מסוג מספר").positive("כמות לא יכולה להיות שלילית").required("הכנס כמות"),
                Type: yup.string().required("הכנס סוג")
            })
        )
    })

    const userId = useSelector(state => state.user.user.Id)
    const categories = useSelector(state => state.categories.categories)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [selectedLevel, setSelectedLevel] = useState(1);
    const recipe = useSelector(state => state.recipes.selectedRecipe);
    console.log(recipe)

    const { register, control, handleSubmit, formState: { errors }, } = useForm({ resolver: yupResolver(schema), })

    const { fields: Ingrident, append: apppendIngrident, remove: removeIngrident } = useFieldArray({
        control,
        name: "Ingrident", 
    });
    const { fields: Instructions, append: apppendInstruction, remove: removeInstruction } = useFieldArray({
        control, name: "Instructions",
    });

    useEffect(() => {
        recipe?.Ingrident?.map((ing) => apppendIngrident(ing))
        recipe?.Instructions?.map((ins) => {
            apppendInstruction(ins)
        })
    }, [recipe]);



    const onSubmit = (data) => {
        let recipeToSend = {
            Id: recipe?.Id,
            Name: data.Name, UserId: userId, CategoryId: data.CategoryId, Img: data.Img, Duration: data.Duration, Difficulty: data.Difficulty, Description: data.Description,
            Ingrident: data.Ingrident, Instructions: data.Instructions
        }



        if (!recipe) {
             dispatch(addRecipe(recipeToSend))
             navigate("/recipes");
           
        }

        else {
            dispatch(editRecipe(recipeToSend))
            Swal.fire({ icon: 'success', position: 'top-left', title: 'המתכון עודכן בהצלחה' })
            navigate("/recipes");
        }

    }




    return (<div className="add">


        <Form className="form" onSubmit={handleSubmit(onSubmit)}>
            <Input type="text"{...register("Name")} placeholder="הכנס שם" />
            <p>{errors.Username?.message}</p>


            <select {...register("CategoryId")} name="CategoryId"  defaultValue={recipe ? recipe.CategoryId : 0} >
                <option value={0} disabled>כל המתכונים</option>
                {categories?.map((category) =>
                    <option key={category.Id} value={category.Id}>{category.Name}</option>)}
            </select>
            {errors.CategoryId?.message ? <Message warning content={errors.CategoryId.message} /> : <></>}

            {/* <Input type="number" {...register("Difficulty")} placeholder="הכנס רמת קושי" /> */}
            <select onChange={(e) => setSelectedLevel(e.target.value)}{...register("Difficulty")}{...register("Difficulty")} defaultValue="" placeholder="בחר רמת קושי">
                    <option value="" disabled hidden>בחר רמת קושי</option>
                    <option value="קל">קל</option>
                    <option value="בינוני">בינוני</option>
                    <option value="קשה">קשה</option>
                </select>
            <p>{errors.Difficulty?.message}</p>

            <Input type="number" {...register("Duration")} placeholder="הכנס משך הכנה בדקות"  defaultValue={recipe?.Duration} />
            <p>{errors.Duration?.message}</p>

            <Input type="text" {...register("Description")} placeholder="  תיאור של המתכון" defaultValue={recipe?.Description}/>
            <p>{errors.Description?.message}</p>

            <Input type="text" {...register("Img")} placeholder="הכנס  קישור לתמונה"defaultValue={recipe?.Img} />
            <p>{errors.Img?.message}</p>


            <div>
                {Ingrident?.map((ingrident, index) => (

                    <div key={ingrident.id}>
                        <Input placeholder="שם" {...register(`Ingrident.${index}.Name`)}  defaultValue={ingrident?.Name} />
                        <p>{errors[`Ingrident.${index}.Name`]?.message}</p>

                        <Input type="number" placeholder="כמות"{...register(`Ingrident.${index}.Count`)} defaultValue={ingrident?.Count} />
                        <p>{errors[`Ingrident.${index}.Count`]?.message}</p>

                        <Input placeholder="סוג" {...register(`Ingrident.${index}.Type`)}  defaultValue={ingrident?.Type} />
                        <p>{errors[`Ingrident.${index}.Type`]?.message}</p>


                    </div>))}


            </div>

            <Button onClick={() => { apppendIngrident({ Name: null, Count: null, Type: null }) }}>הוסף מצרך➕</Button>
            <Button onClick={() => removeIngrident}>להסרת מצרך❌</Button>

            {Instructions?.map((instruction, index) => (
                <div key={Instructions.id}>
                    <Input placeholder="הכנס הוראה"  {...register(`Instructions.${index}`)}  defaultValue={instruction} />
                </div>

            ))}

            <p>{errors.Instructions?.message}</p>
            <Button onClick={() => apppendInstruction(null)} >הוסף הוראה➕</Button>
            <Button onClick={()=>removeInstruction} >להסרת הוראה❌</Button>
            <br />
            <Button type="submit" className='but' >אישור</Button>
        </Form>





    </div>)








}

