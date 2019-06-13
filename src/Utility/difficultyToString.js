export const difficultyToString = (difficulty) => {

    //Returns Easy, Medium, or Hard
    //Depending on the difficulty level
    if (difficulty >= 1 && difficulty <= 33) {
        return 'Easy';
    } else if (difficulty >= 34 && difficulty <= 66) {
        return 'Medium'
    } else if (difficulty >= 67 && difficulty <= 100) {
        return 'Hard';
    }
}