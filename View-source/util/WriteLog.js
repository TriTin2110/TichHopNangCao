import chalk from "chalk";
class MessageType { 
        static INFORMATION = 'INFORMATION'
        static ERROR = 'ERROR'
        static SUCCESS = 'SUCCESS'
        static WARNING = 'WARNING'
}

let writeLog = (message, type) => { 
        switch (type) {
                case MessageType.INFORMATION:
                        console.log(chalk.white(message))
                        break;
                
                case MessageType.SUCCESS:
                        console.log(chalk.green(message))
                        break;

                case MessageType.ERROR:
                        console.log(chalk.red(message))
                        break;

                case MessageType.WARNING:
                        console.log(chalk.yellow(message))
                        break;

        }
}

export { writeLog, MessageType}