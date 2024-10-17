document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('container');

    const createNewDiv = () => {
        const newDiv = document.createElement('div');
        newDiv.className = 'input shadow';
        newDiv.contentEditable = 'true';
        newDiv.style.width = '210mm';
        newDiv.style.height = '1122px'; // Altura A4 em pixels
        newDiv.style.padding = '10px';
        newDiv.style.margin = '10px auto'; // Espaço entre as divs

        container.appendChild(newDiv);
        newDiv.focus(); // Foca na nova div

        // Adiciona o evento de input na nova div
        newDiv.addEventListener('input', function () {
            // Verifica se o conteúdo excede a altura da div
            if (newDiv.scrollHeight > 1122) {
                createNewDiv(); // Cria nova div se necessário
            }
        });
    };

    // Cria a primeira div ao carregar a página
    createNewDiv();
});
