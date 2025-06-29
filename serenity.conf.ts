
export const config = {

    urls: {
        netflix: 'https://www.netflix.com/co/login',
        conduit: 'http://localhost:4200/login'
    },

    framework: 'cucumber',
    cucumberOpts: {

        require: [
            './src/steps/*.ts',
            './src/actors/*.ts',
            './src/questions/*.ts',
            './src/tasks/*.ts',
            './src/support/*.ts'
        ],
        feature: [
            './tests/features/*.feature'
        ],
        format: [
            'progress'
        ],
    },
};