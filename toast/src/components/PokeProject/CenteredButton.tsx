import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CenteredButton.css'; // Import your custom CSS

type WrapperProps = {
    children: React.ReactNode; // Define the type for children
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
};


const CenteredButton: React.FC<WrapperProps> = ({children, onClick}) => {
    return (
        <div className="center-button">
            <Button onClick={onClick} variant="primary">{children}</Button>
        </div>
    );
}

export default CenteredButton;
