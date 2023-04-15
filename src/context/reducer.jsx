
export const reducer = (state, action) => {

    switch (action.type) {
        case "SET_DEFAULT_QUESTIONS":
            return {
                defaultQuestions: action.payload
            }
    }
}