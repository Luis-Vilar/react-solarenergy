
 
import { screen, render } from '@testing-library/react';
import { LancamentoGeracaoMensal } from '../components/Lancamento-mensal/LancamentoMensal';
import userEvent from '@testing-library/user-event';


describe('Unit tests for LancamentoGeracaoMensal component', () => {
    beforeEach(() => {
        jest.mock('axios', () => ({
            post: () => Promise.resolve({ data: { status: 201 }, id: 1, apelido: 'teste' })
        }));
    });

    it('quando não houver unidade selecionada: o formulário deverá iniciar com os campos vazios', async () => {
        render(<LancamentoGeracaoMensal />);

        const inputMes = await screen.findByLabelText(/mês/i);
        const inputKw = await screen.findByLabelText(/total kw gerado/i);
        screen.debug(inputKw);
        screen.debug(inputMes);

        expect(inputMes.value).toBe('');
        expect(inputKw.value).toBe('');
    }
    );
    it.todo('')
}
);