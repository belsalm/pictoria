import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AuthContext from './AuthContext';
import { storeCurrency } from '../utils/currency';
import { categories } from '../utils/categories';
import firestore from '@react-native-firebase/firestore';
import { storeTheme } from '../utils/theme';
import { createMoneyBoxTable, deleteMoneyBoxTable } from '../dbHelpers/moneyboxHelper';
import { createCategoryTable, deleteCategoryTable, insertCategory } from '../dbHelpers/categoryHelper';
import auth from "@react-native-firebase/auth";
import { createTransactionsTable, deleteTransactionsTable } from '../dbHelpers/transactionHelper';

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_USER':
          return {
            ...prevState,
            user: action.user,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            user: action.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            user: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let jsonUser;
      try {
        jsonUser = await AsyncStorage.getItem('user');
      } catch (e) {
        console.log(e)
      }
      dispatch({ type: 'RESTORE_USER', user: JSON.parse(jsonUser) });
    };
    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(() => ({
    // Sign In
    signIn: async (user) => {
      // Store User
      const jsonUser = JSON.stringify(user);
      await AsyncStorage.setItem('user', jsonUser);
      //Darkmode false default
      storeTheme({
        darkmode: false,
      })
      dispatch({ type: 'SIGN_IN', user: jsonUser });
    },
    // Sign Out
    signOut: async () => {
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'SIGN_OUT' });
    },
    //Delete Data
    deleteData: async () => {
      // Delete User
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('theme');
      dispatch({ type: 'SIGN_OUT' });
    },
    //Delete Account
    deleteAccount: async () => {
      let data = await AsyncStorage.getItem('user').then(result => {
        return JSON.parse(result);
      });

      let user = auth().currentUser;

      const id = await firestore()
        .collection('Users')
        // Filter results
        .where('email', '==', data.email)
        .get()
        .then(querySnapshot => {
          if (querySnapshot._docs[0]._ref._documentPath._parts[1]) {
            return querySnapshot._docs[0]._ref._documentPath._parts[1]
          }else{
             return undefined
          }
        });

      if (user) {
        user
          .delete()
          .then(() => console.log("User deleted"))
          .catch((error) => console.log(error));

      }

      if (id) {
        firestore()
          .collection("Users")
          .doc(id)
          .delete()
      }

      //Delete User
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('theme');
      dispatch({ type: 'SIGN_OUT' });
    },
  }),
    [],
  );

  return (
    <AuthContext.Provider value={{ authContext, state }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
