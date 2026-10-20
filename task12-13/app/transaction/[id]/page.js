import TransactionDetail from '../../../components/TransactionDetail';export default async function DetailPage({params}){const {id}=await params;return <TransactionDetail id={id}/>;}
