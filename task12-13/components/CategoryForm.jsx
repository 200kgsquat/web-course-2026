"use client";
import {useCategoryController} from '../client/controllers/useCategoryController';
import CategoryFormView from '../client/views/CategoryFormView';
export default function CategoryForm({onSaved}) { return <CategoryFormView {...useCategoryController(onSaved)}/>; }
