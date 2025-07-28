import Note from "../models/notes.js";
export async function GetAllNotes(_,res) {
    try{
        const notes = await Note.find().sort({ title:-1});
        res.status(200).json(notes);
    }catch(err){
        console.error("Error in get all notes: ",err);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function GetNodeById(req,res) {
    try{
        const notes = await Note.findById(req.params.id)
        res.status(200).json(notes);
    }catch(err){
        console.error("Error in get all notes: ",err);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function CreateNotes(req,res){
    try{
        const { title,content } = req.body;
        const note = new Note({title,content});

        const savedNote = await note.save();
        res.status(201).json(savedNote);
    }catch(err){
        console.error("Error in Create Notes: ",err);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function UpdateNotes(req,res) {
    try{
        const { title,content } = req.body
        const id = req.params.id;
        const updateNote = await Note.findByIdAndUpdate(id,
            {title,content},
            {new:true}
        )
        if(!updateNote) return res.status(404).json({message:"Message not found"});
        res.status(200).json(updateNote)
    }catch(err){
        console.error("Error in Update Notes: ",err),
        res.status(500).json({message:"Internal server error"});
    }
}
export async function RemoveNotes(req,res){
    try{
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id)
        if(!deletedNote) return res.status(404).json("Note not found");
        res.status(200).json({message:"Success to remove Note"})
    }catch(err){
        console.error("Error in Remove Notes: ",err),
        res.status(500).json({message:"Internal server error"});
    }
}