const Quiz = require("../database/models/Quiz");

const getInGameQuiz = async(req,res) =>{
    try{
        const quizzes = await Quiz.find({createdBy: null});
        res.status(200).json(quizzes);
    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
};

const getInGameSingleQuiz = async(req,res) =>{
    const {questionId} = req.query;
    try{
        const quiz = await Quiz.findOne({createdBy: null}).lean();

        if(!quiz) {
            return res.status(404).json({
                message: "Quiz not found"
            });
        }
        const question =  quiz.questions.find(q => q._id.toString() === questionId);
        if(!question){
            return res.status(404).json({
                message: "Question not found"
            })
        }
        res.status(200).json(question);
    }catch(err){
        res.status(500).json({
            error: err.message
        });
    }
}

//creating quiz title for logged in users
const createQuizTitle = async(req,res) =>{
    try{
        const{title, isPublic} = req.body;

        if(!title || title.trim() === ""){
            return res.status(400).json({
                message: "Title is required"
            });
        }
        const quiz = await Quiz.create({
            title: title.trim(),
            isPublic: isPublic ?? false,
            createdBy : req.user._id,
            questions:[]
        });
        res.status(201).json({
            message: "Quiz created successfully",
            quiz
        });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//add question route
const addQuestion = async(req,res) =>{
    try{
        const {id} = req.params;
        const {question,category,options,correctAnswer} = req.body;

        if(!question || !category || !options || correctAnswer=== undefined){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        if(!Array.isArray(options) || options.length < 4){
            return res.status(400).json({
                message: "4 options are required"
            });
        }
        const quiz = await Quiz.findById(id);
        if(!quiz){
            return res.status(404).json({
                message: "Quiz not found"
            });
        }
        if(!quiz.createdBy || 
            quiz.createdBy.toString() !== req.user._id.toString()
        ){
            return res.status(403).json({
                message: "Not authorized to modify quiz"
            });
        }
        quiz.questions.push({
            question,
            category,
            options,
            correctAnswer
        });
        await quiz.save();

        res.status(201).json({
                message: "Question added successfully",
                totoalQuestions: quiz.questions.length
            });
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//get single quiz
const getSingleQuiz = async(req,res) =>{
    try{
        const {id}= req.params;
        const quiz = await Quiz.findById(id).lean();
        if(!quiz){
            return res.status(404).json({
                message: "Quiz not found"
            });
        }
        const isOwner = 
            req.user && quiz.createdBy && quiz.createdBy.toString() === req.user._id.toString();
        if(!isOwner){
            return res.status(403).json({
                message: "Not Authorized to view this quiz"
            })
        }
        res.status(200).json({
        quiz,
        isOwner,
        totalQuestions: quiz.questions.length
        });
    }catch (err) {
    res.status(500).json({ message: err.message });
  }
}
//get all quizzes
const getAllQuizzes = async(req,res) =>{
    try{
        const quizzes = await Quiz.find({createdBy: req.user._id}).sort({createdAt: -1}).lean();
        res.status(200).json({
            quizzes
        });
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}

module.exports = {
    getInGameQuiz,
    getInGameSingleQuiz,
    createQuizTitle,
    addQuestion,
    getSingleQuiz,
    getAllQuizzes,
}