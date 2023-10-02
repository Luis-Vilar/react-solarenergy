//testing dependencies
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
//component dependencies
import { MenuLateral } from '../components/menu-lateral/menu-lateral';
import { BrowserRouter } from 'react-router-dom';

describe('Unit tests for MenuLateral component', () => {

    const renderWithRouter = (ui, { route = '/' } = {}) => {
        window.history.pushState({}, 'Test page', route)

        return {
            user: userEvent.setup(),
            ...render(ui, { wrapper: BrowserRouter }),
        }
    }



    it('se o componente é renderizado corretamente: com logo e 3 botões/links', () => {

        renderWithRouter(<MenuLateral />, { route: '/dashboard' })

        expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
        expect(screen.getAllByRole('link')).toHaveLength(3);
    });

    it('se o botão da rota default inicia selecionado e os demais não selecionados', () => {

        const { container } = renderWithRouter(<MenuLateral />, { route: '/dashboard' })

        // Lembrete de gambiarra :
        //
        // As class deveriam estar nomeadas como selected e unselected 
        // para facilitar a busca mas como não estão, busca pela classe
        // active que é a que indica que o botão está selecionado e pela 
        // classe btn que é a classe dos botões nao selecionados 

        const classActive = container.getElementsByClassName('active');
        expect(classActive).toHaveLength(1);
        expect(classActive[0]).toHaveTextContent('Dashboard');

        const classBtn = container.getElementsByClassName('btn');
        expect(classBtn).toHaveLength(2);
        expect(classBtn[0]).toHaveTextContent('Unidades');
        expect(classBtn[1]).toHaveTextContent('Cadastro de energia geradora');

    });

    it('se a página é alterada corretamente quando clica em algum botão', async () => {

        const { user } = renderWithRouter(<MenuLateral />, { route: '/dashboard' })
        const btnUnidades = screen.getByRole('link', { name: /unidades/i });
        const btnLancamentoMensal = screen.getByRole('link', { name: /cadastro de energia geradora/i });

        await user.click(btnUnidades);
        expect(window.location.pathname).toBe('/unidade-geradora');

        await user.click(btnLancamentoMensal);
        expect(window.location.pathname).toBe('/lancamento-mensal');

    });

    it('se a página é alterada para a default quando clica no logo', async () => {
        const { user } = renderWithRouter(<MenuLateral />, { route: '/dashboard' })

        const logo = screen.getByRole('img', { name: /logo/i });
        const btnUnidades = screen.getByRole('link', { name: /unidades/i });

        await user.click(btnUnidades);
        expect(window.location.pathname).toBe('/unidade-geradora');

        await user.click(logo);
        expect(window.location.pathname).toBe('/dashboard');

    });
});
