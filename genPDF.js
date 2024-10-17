window.jsPDF = window.jspdf.jsPDF;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generatePdf').addEventListener('click', function () {
        const container = document.getElementById('container');
        const divs = container.querySelectorAll('.input');
        const pdf = new window.jsPDF('p', 'mm', 'a4');
        const pageHeight = 297; // altura A4 em mm
        const pageWidth = 210; // largura A4 em mm
        const margin = 10; // margem em mm

        let position = margin; // posição inicial em mm

        const promises = Array.from(divs).map((div, index) => {
            return html2canvas(div, { scale: 2 }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const imgWidth = pageWidth - 2 * margin; // largura da imagem com margens
                const imgHeight = (canvas.height * imgWidth) / canvas.width; // altura ajustada

                if (position + imgHeight > pageHeight - margin) {
                    pdf.addPage();
                    position = margin; // Reinicia a posição
                }

                pdf.addImage(imgData, 'PNG', margin, position, imgWidth, imgHeight);
                position += imgHeight + margin; // Atualiza a posição para a próxima div

                if (index === divs.length - 1) {
                    pdf.save('document.pdf');
                }
            });
        });

        Promise.all(promises).catch(error => {
            console.error('Erro ao gerar o PDF:', error);
        });
    });
});
