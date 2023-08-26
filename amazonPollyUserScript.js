document.addEventListener('DOMContentLoaded', function () {
    const playButton = document.getElementById('playButton');

    playButton.addEventListener('click', async function () {
        const textInput = document.getElementById('textInput').value.trim();
        // console.log("textInput check", textInput);
        // console.log("textInput type", typeof textInput);

        try {
            // Query backend endpoint
            const response = await axios.post('/generate-audio', {
                textInput: textInput
            }, {
                responseType: 'arraybuffer'
            });

            const audioData = response.data;
            const blob = new Blob([audioData], { type: 'audio/mpeg' });

            const audioElement = new Audio();
            audioElement.src = URL.createObjectURL(blob);

            // Play the audio
            audioElement.play();
        } catch (error) {
            console.error(error);
        }
    });
});
