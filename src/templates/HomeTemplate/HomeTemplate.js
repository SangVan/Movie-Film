import { Fragment, useEffect } from "react"
import { Route } from "react-router-dom";
import UserModal from "../../components/Modal/UserModal";
import Footer from "./Layout/Footer/Footer";
// import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";



export const HomeTemplate =(props)=>{
    useEffect(() => {
        window.scrollTo(0, 0);
      });
    const{Component, ...restProps} = props;

    return <Route {...restProps} render = {(propsRoute)=>{
        return <Fragment>
            <Header {...propsRoute}/>
            {/* <HomeCarousel {...propsRoute} /> */}
            <UserModal {...propsRoute} />
            <Component {...propsRoute} />
            <Footer {...propsRoute}/>
        </Fragment>
    }}/>
}
