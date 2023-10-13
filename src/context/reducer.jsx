
export const reducer = (state, action) => {

    switch (action.type) {
        case "SET_DEFAULT_QUESTIONS":
            return {
                ...state,
                defaultQuestions: action.payload
            }
        case "API_LOADING":
            return {
                ...state,
                isLoading: true
            }
        case "SET_COMMUNITY_VALIDATION":
            return {
                ...state,
                isLoading: false,
                communtiyValidationData: action.payload
            }

        case "GET_COMMUNITIES":
            return {
                ...state,
                isLoading: false,
                allCommunities: action.payload,
                allCommunitiesLoading: false
            }

        case "SET_DEFAULT_ERROR":
            return {
                ...state,
                isError: action.payload
            }

    }
}