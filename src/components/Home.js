import React from 'react';
import { getUser } from '../utilities/Common';

function Home(props) {
    const user = getUser();
    return (
        <div className="site-layout-content">Welcome {user.username}!</div>
    );
}

export default Home;