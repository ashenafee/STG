import AsyncStorage from '@react-native-async-storage/async-storage';

const logOutKey: string = "@loggedOut";

const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        console.log(e);
    }
};

const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

const isLoggedOut = async (): Promise<boolean> => {
    const loggedOut = await getData(logOutKey);
    if (loggedOut === null) {
        storeData(logOutKey, "true");
        return true;
    } else if (loggedOut === "false") {
        return false;
    } else {
        return true;
    }
};

const logIn = async (): Promise<void> => {
    await storeData(logOutKey, "false");
};

const logOut = async (): Promise<void> => {
    await storeData(logOutKey, "true");
};

export { isLoggedOut, logIn, logOut };
