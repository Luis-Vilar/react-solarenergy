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
  it('Should by render with title : “Cadastro de Unidade Geradora”', async () => {
    renderComponent();
    const titulo = await screen.getByText('Cadastro de Unidade Geradora');
    expect(titulo).toBeInTheDocument();
  });
  it("If any required field is not filled in, clicking 'Save' should not trigger the open/close form function", async () => {
    renderComponent();
    const botaoSalvar = await screen.findByText(/salvar/i);
    userEvent.click(botaoSalvar);
    expect(mudarFormulario).not.toHaveBeenCalled();

  });
  it.skip("If all the mandatory fields are filled in, clicking 'Save' should trigger the open/close form function", async () => {
    render(<CadastroUnidade mudarFormulario={mudarFormulario} />);
    screen.debug();
  });

});


