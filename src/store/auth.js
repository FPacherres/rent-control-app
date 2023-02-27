import { createSlice } from '@reduxjs/toolkit';
import { getFirestore, collection, addDoc, getDoc, setDoc, doc, deleteDoc } from 'firebase/firestore'
import app from '../firebase'


const db = getFirestore(app)

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        typeUser: "SuperAdmi",
        uid: null,
        user: {},
        users: []
    },
    reducers: {
        getTypeUser: (state, action) => {
            state.typeUser = action.payload
        },
        getCurrentUserKey: (state, action) => {
            state.uid = action.payload.user.uid
        },
        getUsersStore: (state, action) => {
            state.users = action.payload
        },
        getUserStore: state => {
            
            const user = state.users.find(u => u.id === state.uid)
            
            const docRef = doc(collection(db, "superUsers"), user.key);
            const userDoc = getDoc(docRef);
            
            state.user = userDoc.data();
            console.log("action", state)
        }
    }
})

export const { getTypeUser } = authSlice.actions
// export const { getCurrentUserKey, getUsersStore, getUserStore } = authSlice.actions

export default authSlice.reducer