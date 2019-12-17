export const getGeneration = (generation) =>{
    switch (generation) {
        case "Generation I":
            return "1";
        case "Generation II":
            return "2";
        default:
            return generation
    }
}

