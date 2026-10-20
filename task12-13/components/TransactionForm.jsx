"use client";
import {useTransactionFormController} from '../client/controllers/useTransactionFormController';
import TransactionFormView from '../client/views/TransactionFormView';
export default function TransactionForm({initial, onSaved}) { return <TransactionFormView {...useTransactionFormController(initial, onSaved)}/>; }
