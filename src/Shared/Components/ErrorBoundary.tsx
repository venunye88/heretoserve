
import * as React from "react";
//import { Log } from "../Utilities/LogUtil";
interface IErrorBoundryProps {
    errorMessage?: string;
}
interface IErrorBoundryState {
    hasError: boolean;

}
export class ErrorBoundary extends React.Component<IErrorBoundryProps, IErrorBoundryState> {
    constructor(props: IErrorBoundryProps) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch(error: any, info: any) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        //Log.consoleObj({ error, info });
    }

    public render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (<div>
                        <h1>{this.props.errorMessage}</h1>
                        <h2>Error encounted, check console for more details on the error</h2>
                    </div>);
        }

        return (<div>
            {this.props.children}
        </div>);
    }
}
