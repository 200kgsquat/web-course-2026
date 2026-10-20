"use client";
import {useDetailController} from '../client/controllers/useDetailController';
import TransactionDetailView from '../client/views/TransactionDetailView';
export default function TransactionDetail({id}) { return <TransactionDetailView id={id} {...useDetailController(id)}/>; }
