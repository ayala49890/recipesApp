import { useDispatch, useSelector } from "react-redux";
import { addBuying, deleteBuying, editBuying, getBuying } from "../service/serviceBuying";
import { useNavigate } from "react-router-dom";
import { TableCell, TableRow } from "@mui/material";
import { Button } from "@mui/base";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { Form, Input } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const schema = yup.object({
    Name: yup.string().required("שדה חובה"),
    Count: yup.string().required("שדה חובה"),
    Type: yup.string().required("שדה חובה"),
});
export default function BuyList() {
    const [theProduct, setProduct] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getBuying(userId))
    }
        , []);
    const { userId, buyingList } = useSelector((state) => ({
        userId: state.user.user.Id,
        buyingList: state.buying.buyingList,
    }));

    const deleteProduct = (product) => {

        dispatch(deleteBuying(product.UserId,product.Id))
        setProduct(true);

    }
    const increaseAmount = (product) => {
        let productForSent = { Id: product.Id, Name: product.Name, Count: product.Count+1, UserId: userId }
        dispatch(editBuying(productForSent))
        setProduct(true);


    }
    const decreaseAmount = (product) => {
        let productForSent = { Id: product.Id, Name: product.Name, Count:product.Count -1, UserId: userId }
        if (product.Count > 1) {

            dispatch(editBuying(productForSent))
            setProduct(true);


        }

        else dispatch(deleteBuying(product))
    }

    const { register, handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });




    return <>
        {buyingList?.map((product, i) => (

            <TableRow key={i}>
                <TableCell>{product.Count + " "}</TableCell>
                <TableCell value={product.Name}>{product.Name}</TableCell>
                <TableCell >
                    <Button floated='left' onClick={() => { increaseAmount(product) }}>+</Button>
                    <Button floated='left' onClick={() => { decreaseAmount(product) }}>-</Button>
                    <Button floated='left' onClick={() => { deleteProduct(product) }}>מחיקה </Button>
                </TableCell>
            </TableRow>
        ))
        }

    </>


}