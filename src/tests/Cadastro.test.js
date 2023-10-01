import { screen, render } from '@testing-library/react';
import { CadastroUnidade } from '../components/cadastroUnidade/Cadastro';
import userEvent from '@testing-library/user-event';
import axios from 'axios'

const mudarFormulario = jest.fn(() => { });
const spyGet = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: { status: 200 } }));
const spyPost = jest.spyOn(axios, 'post').mockImplementation(() => Promise.resolve({ data: { status: 201 } }));

const renderComponent = () => render(<CadastroUnidade mudarFormulario={mudarFormulario} />);


describe('Unit tests for Cadastro component', () => {

  it('se o componente é renderizado corretamente: com título “Cadastro de Unidade Geradora', async () => {
    renderComponent();
    const titulo = await screen.getByText('Cadastro de Unidade Geradora');
    expect(titulo).toBeInTheDocument();
  });
  it("se algum camplo obrigatório não estiver preenchido, ao clicar em “Salvar”, não deverá chamar a função de abrir/fechar formulário", async () => {
    renderComponent();
    const botaoSalvar = await screen.findByText(/salvar/i);
    userEvent.click(botaoSalvar);
    expect(mudarFormulario).not.toHaveBeenCalled();

  });
  it("se preencher todos os campos obrigatórios, ao clicar em “Salvar”, deverá chamar a função de abrir/fechar formulário com a opção correta",async()=>{
    renderComponent();

    const inputApelido = await screen.findByLabelText(/apelido/i);
    const inputLocal = await screen.findByLabelText(/local/i);
    const inputMarca = await screen.findByLabelText(/marca/i);
    const inputModelo = await screen.findByLabelText(/modelo/i);
    const checkbox = await screen.findByLabelText(/ativo/i);
    const botaoSalvar = await screen.getByRole('button', { name: /salvar/i })

    await userEvent.type(inputApelido, 'Unidade 1');
    await userEvent.type(inputLocal, 'Local 1');
    await userEvent.type(inputMarca, 'Marca 1');
    await userEvent.type(inputModelo, 'Modelo 1');
    await userEvent.click(checkbox);

    expect(inputApelido.value).toBe('Unidade 1');
    expect(inputLocal.value).toBe('Local 1');
    expect(inputMarca.value).toBe('Marca 1');
    expect(inputModelo.value).toBe('Modelo 1');
    expect(checkbox.checked).toBe(true);

    // await userEvent.click(botaoSalvar);



  });
  it.todo('se preencher todos os campos obrigatórios, ao clicar em “Salvar”, deverá limpar as informações do formulário')
  it.todo('ao clicar no checkbox seu estado deve ser alterado entre checado e não checado')
});


