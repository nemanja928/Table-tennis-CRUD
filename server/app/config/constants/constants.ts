class Constants {
    static secret: string = "TableTennisEnlightIT#pedo";
    public static mailConfig = {
        email: "takozasvasta@gmail.com",
        clientId:
            "365633834640-loeehmq5r18lu448f2o89heirpfmeh1b.apps.googleusercontent.com",
        clientSecret: "Ba9heT4Bk-QF1V_Gfuua7w05",
        refreshToken:
            "1/bP2o8j3Ddx4xcrdsbgg2g0HsDDwOM9tJAwokq8C6PO0ygp2HT4pMs_GUHUNcF0kE"
    };

    public static port = 3000;

    public static dbSettings = {
        development: {
            username: "danilo",
            password: "ttenlight123",
            database: "tt-enlightit",
            host: "mlab",
            dialect: "mongodb"
        },
        production: {
            username: "update me",
            password: "update me",
            database: "update me",
            host: "update me",
            dialect: "update me"
        }
    };
}

Object.seal(Constants);
export = Constants;
