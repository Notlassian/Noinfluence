import './css/Unauthenticated.css';

export const Unauthenticated = () => {
    return <div className="unauthenticated-content">
        <img className='logged-out-image' src = "/logged-out.svg" alt="Logged Out"/>
        <h1>You are logged out, please login to continue.</h1>
    </div>
}