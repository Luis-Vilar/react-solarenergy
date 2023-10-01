import { screen, render } from '@testing-library/react';
import { CadastroUnidade } from '../components/cadastroUnidade/Cadastro';
import userEvent from '@testing-library/user-event';

const mudarFormulario = jest.fn(() => { });

const renderComponent = () => render(<CadastroUnidade mudarFormulario={mudarFormulario} />);


describe('Unit tests for Cadastro component', () => {

  beforeEach(() => {

    jest.mock('axios', () => ({
      post: () => Promise.resolve({ data: { status: 201 } })
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  }
  );
  it('se o componente é renderizado corretamente: com título “Cadastro de Unidade Gerada”', async () => {
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
  it.skip("se preencher todos os campos obrigatórios, ao clicar em “Salvar”, deverá chamar a função de abrir/fechar formulário com a opção correta", async () => {
    render(<CadastroUnidade mudarFormulario={mudarFormulario} />);
    screen.debug();
  });
it.todo('se preencher todos os campos obrigatórios, ao clicar em “Salvar”, deverá limpar as informações do formulário')
it.todo('ao clicar no checkbox seu estado deve ser alterado entre checado e não checado')
});


