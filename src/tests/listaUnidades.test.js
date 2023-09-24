import { render, screen } from "@testing-library/react";
import ListaUnidades from "../components/listaUnidades/listaUnidades";
import userEvent from '@testing-library/user-event'


//mok do fetch
const mokdata = [{ id: 1, apelido: "Unidade 1", local: "Local 1", marca: "Marca 1", modelo: "Modelo 1" }]

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve(mokdata),
    })
);

const renderComponent = () => {
    render(<ListaUnidades mudarFormulario={mudarFormulario} />);
}
// mok funcao editarUnidade
const mudarFormulario = jest.fn(() => { });
const editarUnidade = jest.fn(() => { });
const removerUnidade = jest.fn(() => { });


describe("Unit Test ListaUnidades", () => {
    it("se o componente é renderizado corretamente: com título “Lista de Unidades”", () => {
        renderComponent();
        expect(screen.getByText("Lista de Unidades")).toBeInTheDocument();
    });
    it("testar comportamento do botão “Editar”", async () => {
        renderComponent();
        const btnEditar = await screen.findByText("Editar");
        expect(btnEditar).toBeInTheDocument();
        await userEvent.click(btnEditar);
        expect(editarUnidade).toBeCalled;

    });
    it("testar comportamento do botão “Remover”", async () => {
        renderComponent();
        const btnRemover = await screen.findByRole('button', { value: /remover/i });
        expect(btnRemover).toBeInTheDocument();
        await userEvent.click(btnRemover);
        expect(removerUnidade).toBeCalled;

    });
    it("testar comportamento do botão “Nova Unidade”", async () => {
        renderComponent();
        const btnNovaUnidade = await screen.findByRole('button', { value: /nova unidade/i });
        expect(btnNovaUnidade).toBeInTheDocument();
        await userEvent.click(btnNovaUnidade);
        expect(mudarFormulario).toBeCalled;

    });

    it("se a tabela é renderizada com o cabeçalho correto", async () => {
        renderComponent();
        const id = await screen.getByText("ID"); 
        const apelido =await screen.getByText("Apelido");
        const local = await screen.getByText("Local");
        const marca =await screen.getByText("Marca");
        const modelo =await screen.getByText("Modelo");

        expect(id).toBeInTheDocument();
        expect(apelido).toBeInTheDocument();
        expect(local).toBeInTheDocument();
        expect(marca).toBeInTheDocument();
        expect(modelo).toBeInTheDocument();

    });
    it("se a primeira linha da tabela é rendeizada corretamente", async () => {
        renderComponent();
        const id = await screen.findByText("1");
        const apelido = await screen.findByText("Unidade 1");
        const local = await screen.findByText("Local 1");
        const marca = await screen.findByText("Marca 1");
        const modelo = await screen.findByText("Modelo 1");
        expect(id).toBeInTheDocument();
        expect(apelido).toBeInTheDocument();
        expect(local).toBeInTheDocument();
        expect(marca).toBeInTheDocument();
        expect(modelo).toBeInTheDocument();
    });


});

