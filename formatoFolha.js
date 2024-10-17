document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');
    
    // Função para criar uma nova div (página)
    function createNewDiv() {
        const newDiv = document.createElement('div');
        newDiv.className = 'input shadow';
        newDiv.contentEditable = 'true';
        newDiv.style.width = '210mm';
        newDiv.style.height = '1122px'; // Altura A4 em pixels
        newDiv.style.padding = '10px';
        newDiv.style.margin = '10px auto'; // Espaço entre as divs
        newDiv.style.border = '1px solid #ccc';
        newDiv.style.overflow = 'hidden'; // Impede o transbordamento visual
        newDiv.style.pageBreakAfter = 'always'; // Garante quebra de página no PDF

        container.appendChild(newDiv);
        newDiv.focus(); // Foca na nova div

        // Evento de input para verificar o tamanho da div
        newDiv.addEventListener('input', handleInput);
        newDiv.addEventListener('paste', handlePaste); // Evento para lidar com colagens
    }

    // Função para garantir que sempre tenha uma página quando tudo for apagado
    function checkForEmptyContainer() {
        if (container.children.length === 0) {
            createNewDiv(); // Se não houver páginas, cria uma nova
        }
    }

    // Cria a primeira página ao carregar a página
    createNewDiv();

    // Função para lidar com a digitação
    function handleInput(event) {
        const div = event.target;

        // Verifica se o conteúdo excede a altura da página
        if (div.scrollHeight > div.clientHeight) {
            splitContent(div); // Divide o conteúdo se necessário
        }
    }

    // Função para lidar com colagens (Ctrl + V)
    function handlePaste(event) {
        event.preventDefault();

        const div = event.target;
        const text = event.clipboardData.getData('text/plain'); // Obtém o texto que foi colado

        // Insere o texto manualmente
        insertTextAtCursor(div, text);

        // Aguarda um pouco para o navegador processar a colagem e depois divide o conteúdo
        setTimeout(() => {
            if (div.scrollHeight > div.clientHeight) {
                splitContent(div); // Divide o conteúdo se necessário
            }
        }, 100); // Dá um pequeno atraso para o conteúdo ser renderizado
    }

    // Função para dividir o conteúdo de uma div que ultrapassa o limite
    function splitContent(div) {
        const content = div.innerHTML;
        const excessContent = content.slice(div.innerHTML.length / 2); // Divide o conteúdo ao meio

        // Mantém a metade que cabe na div atual
        div.innerHTML = content.slice(0, div.innerHTML.length / 2);

        // Cria uma nova div para o conteúdo excedente
        createNewDiv();
        const newDiv = container.lastChild;
        newDiv.innerHTML = excessContent;

        // Se a nova div também ultrapassar o limite, chama a função recursivamente
        if (newDiv.scrollHeight > newDiv.clientHeight) {
            splitContent(newDiv);
        }
    }

    // Função auxiliar para inserir texto na posição do cursor
    function insertTextAtCursor(div, text) {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);

        // Move o cursor para o final do texto inserido
        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);
    }

    // Função para limpar todo o conteúdo e criar uma nova página
    function clearContent() {
        container.innerHTML = ''; // Limpa todo o conteúdo
        createNewDiv(); // Garante que uma nova página seja criada após limpar
    }

    // Função de limpar chamada quando o botão "Limpar tudo" é clicado
    document.getElementById('clearButton').addEventListener('click', clearContent);

    // Garante que, após a limpeza, ainda tenha uma página
    container.addEventListener('DOMNodeRemoved', checkForEmptyContainer);
});
