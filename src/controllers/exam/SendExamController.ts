import { Request, Response } from "express";
import fs from 'fs';

const SendExamController = async (req: Request, res: Response) => {
    try {
        const { aluno, sala, respostas, burlou }: any = req.body;

        // Nome do arquivo baseado no número da sala
        const fileName = `sala_${sala}.json`;

        // Lê o conteúdo atual do arquivo ou cria um array vazio se o arquivo não existir
        let data = [];
        if (fs.existsSync(fileName)) {
            try {
                data = JSON.parse(fs.readFileSync(fileName, 'utf8'));
            } catch (parseError) {
                console.error('Ocorreu um erro ao fazer o parsing do JSON:', parseError);
                res.status(500).send('Erro interno do servidor');
                return;
            }
        }

        // Adiciona a resposta ao array de respostas
        const dataEnvio = getDataFormatada(); // Função para obter a data e hora formatada
        data.push({ aluno, respostas, dataEnvio, burlou });

        // Escreve o array de respostas de volta no arquivo
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2));

        console.log(`Resposta adicionada ao arquivo ${fileName}`);
        res.status(201).send('Informações adicionadas ao arquivo com sucesso!');
    } catch (error) {
        console.error('Ocorreu um erro ao lidar com a requisição:', error);
        res.status(500).send('Erro interno do servidor');
    }
}

function getDataFormatada() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês começa do zero
    const ano = dataAtual.getFullYear();
    const hora = String(dataAtual.getHours()).padStart(2, '0');
    const minuto = String(dataAtual.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
}

export { SendExamController }