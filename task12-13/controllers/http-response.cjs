function respond(action,status=200){try{const result=action();return status===204?new Response(null,{status}):Response.json(result,{status});}catch(error){return Response.json({error:error.status?error.message:'Ошибка базы данных'},{status:error.status||500});}}
async function body(request){try{return await request.json();}catch{const error=new Error('Некорректный JSON');error.status=400;throw error;}}
module.exports={respond,body};
