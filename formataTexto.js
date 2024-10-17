function formatText(command) {
    document.execCommand(command, false, null);
}

function clearContent() {
    const container = document.getElementById('container');
    const divs = container.querySelectorAll('.input');

    // Limpa o conteúdo de cada div
    divs.forEach(div => {
        div.innerHTML = ''; 
    });

    // Se desejar, pode recriar uma nova div após limpar
    if (divs.length > 0) {
        divs[0].focus(); // Mantém o foco na primeira div
    } else {
        createNewDiv(); // Cria uma nova div se não houver divs
    }
}
