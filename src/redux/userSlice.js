import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
const initialState = {
    userList: [{
        id: uuidv4(),
        firstName: "PM",
        lastName: "mish",
        email: "92@gmail.com",
        phone: "918273774",
        dob: "",
        address: "",
        education: [],
        expericence: []
    }

    ],

}


const userSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        addUser: (state, action) => {
            state.userList.push({id:uuidv4(),...action.payload});
        },
        updateUser: (state, action) => {

            const index = state.userList.findIndex(user => user.id == action.payload.id);
            if (index !== -1) state.userList[index] = action.payload;
        }
        , deleteUser: (state, action) => {
            state.userList = state.userList.filter(user => user.id != action.payload)
        }
    }

})

export const { addUser, updateUser, deleteUser } = userSlice.actions

export default userSlice.reducer;




// export const booksSlice = createSlice({
//   name: "books",
//   initialState: initialBooks,
//   reducers: {
//     showBooks: (state) => state,
//     addBook: (state, action) => {
//       state.books.push(action.payload);
//     },
//     updateBook: (state, action) => {
//       const { id, title, author } = action.payload;
//       const isBookExist = state.books.filter((book) => book.id === id);

//       if (isBookExist) {
//         isBookExist[0].title = title;
//         isBookExist[0].author = author;
//       }
//     },
//     deleteBook: (state, action) => {
//       const id = action.payload;
//       state.books = state.books.filter((book) => book.id !== id);
//     },
//   },
// });

// export const { showBooks, addBook, updateBook, deleteBook } =
//   booksSlice.actions;
// export default booksSlice.reducer;