import { screen, render } from '@testing-library/react';
import { LancamentoGeracaoMensal } from '../components/Lancamento-mensal/LancamentoMensal';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
const mokdata = [{ id: 1, apelido: "Unidade 1", local: "Local 1", marca: "Marca 1", modelo: "Modelo 1" }, { id: 2, apelido: "Unidade 2", local: "Local 2", marca: "Marca 2", modelo: "Modelo 2" }]

const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: { status: 201 } }));
const spyGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: mokdata }));



describe('Unit tests for LancamentoGeracaoMensal component', () => {

    it('quando não houver unidade selecionada: o formulário deverá iniciar com os campos vazios', async () => {
        render(<LancamentoGeracaoMensal />);
        const selectUnidade = await screen.findByLabelText(/unidade geradora/i);

        const inputMes = await screen.findByLabelText(/mês/i);
        const inputKw = await screen.findByLabelText(/total kw gerado/i);

        expect(spyGet).toHaveBeenCalled();
        expect(inputMes.value).toBe('');
        expect(inputKw.value).toBe('');
        expect(selectUnidade.value).toBe('');
    });
    it('Ao prencher todos os campos obrigatorios e clickar em salvar , devera acontecer uma requisiçao POST na API', async () => {
        render(<LancamentoGeracaoMensal />);
        const selectUnidade = await screen.findByLabelText(/unidade geradora/i);
        const inputMes = await screen.findByLabelText(/mês/i);
        const inputKw = await screen.findByLabelText(/total kw gerado/i);
        const botaoSalvar = await screen.findByText(/cadastro/i);

        await userEvent.selectOptions(selectUnidade, 'Unidade 1');
        await userEvent.type(inputMes, '2023-12');
        await userEvent.type(inputKw, '100');
        await userEvent.click(botaoSalvar);

        expect(spyPost).toHaveBeenCalled();

    })
    it('Quando houver unidade selecionada: o formulário deverá iniciar com os campos prenchidos com os dados da unidade selecionada', async () => {
        render(<LancamentoGeracaoMensal />);
        const selectUnidade = await screen.findByLabelText(/unidade geradora/i);

        await userEvent.selectOptions(selectUnidade, 'Unidade 1');
        expect(selectUnidade.value).toBe('1');


    });
});