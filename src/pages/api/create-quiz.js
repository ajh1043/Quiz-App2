import { prisma } from "@/server/db/client";
import { create_quiz,create_question } from "@/lib/teacher-quiz";

export default async function handler(req,res){
    const {method} = req
    switch (method) {
        case "POST":
            console.log("Teacher Quiz created")
            const body = req.body
            console.log(body)
            // let quiz = Object.assign({},{
            //     quizName: body['quiz_name'],
                
            //     questions: {
            //           createMany: {
            //             data: body['quiz_question'].map((question) => ({
            //               content: question.text,
            //               answer:  question.answer
            //             })),
            //           },
            //     },
                  
        
            // });
    
            create_quiz(body['quiz_name'], body['quiz_question'])
            
            res.status(200).json({message:"Quiz created"})
    }
    

    

}

