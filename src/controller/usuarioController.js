import { usuarioModel } from "../models/usuarioModel";

export const usuarioController = {
    async listar(req,res){
        try {
            const usuarios = await usuarioModel.listar()
            res.json(usuarios)
        } catch (erro){
            res.status(500).json({erro: "Falha ao listar"})
        }
    },
    
    async criar(req,res){
        try {
            const { nome, email} = req.body;
            const novoUsuario = await usuarioModel.criar(nome,email)
            res.status(201).json(novoUsuario)
        } catch (erro) {
            res.status(500).json({erro: "Falha ao criar usuario"})
        }
    },
    async atualizar(req,res){
        try{
            const {id} = req.params;
            const {nome, email} = req.body;

            const atualizado = await usuarioModel.atualizar(id,nome,email)
            if (!atualizado) {
            return res.status(404).json({erro: "Usuario nao encontrado"})
            }
            res.json({message: "Atualizado com sucesso"})
         } catch (erro) {
            res.status(500).json({erro: "falha ao atualizar usuario"})
         }
    },

    async deletar(req,res){
        try{
            const {id} = req.params;
            const deletar = await usuarioModel.deletar(id)
            if(!deletar){
                return res.status(404).json({erro: "Usuario nao encontrado"})
            }
            res.json({message: "Deletado com sucesso"})
        } catch(erro){
            res.status(500).json({erro: "Falaha ao deletar usuario"})
        }
    }
}