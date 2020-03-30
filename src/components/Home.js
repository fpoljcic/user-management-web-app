import React from 'react';
import { getUser } from '../utilities/Common';
import TableEmployee from './TableEmployee';

function Home(props) {
    const user = getUser();
    return (<div>
        <div className="site-layout-content"> <h1>Welcome {user.username}!</h1></div>
            <TableEmployee />
        </div>
        );
}

export default Home;