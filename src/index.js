import * as React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';

import { ApolloProvider } from '@apollo/react-hooks';

import { CMS } from 'tinacms'
import { CMSContext, useCMS } from 'react-tinacms'


let cms = new CMS({sidebar: {hidden: false, position: "displace", buttons: {save: true, reset: true}}});

const client = new ApolloClient({
    uri: 'http://localhost:4000',
});

const EXCHANGE_RATES = gql`
    {
        skus{
            id
            price
            image
            product
        }
    }
`;

function ExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.skus.map(({ id, price , image, product }) => (
        <div key={id}>
            <p>
                {id} {price} {image} {product}
            </p>
        </div>
    ));
}

const App = () => (
    <CMSContext.Provider value={cms}>
        <ApolloProvider client={client}>
            <div>
                <h2>My first Apollo app 🚀</h2>
                <ExchangeRates/>
            </div>
        </ApolloProvider>
    </CMSContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
