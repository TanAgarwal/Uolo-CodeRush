const getData = async () => {
    try {
        await fetch('https://opentdb.com/api.php?amount=10&category=19&difficulty=medium&type=multiple')
            .then(response => response.json())
            .then(data => data.results)
    } catch(e) {
        console.log(e);
    }
    
}

export default getData;