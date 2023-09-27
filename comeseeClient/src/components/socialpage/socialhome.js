import React, { Component } from 'react';
import Socialhomestyle from '../../css/socialpage/socialhome.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Accordion from './accordion';
import Score from './score';

class Socialhome extends Component {

    state = {}

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '', // 新添加的搜索词状态
            selectedFilter: '0',
            sortBy: '0', // 排序標準：0 - 無，1 - 平均分數，2 - 評分人數，3 - 上映日期
            sortOrder: 'asc',
        };
    }

    handleSearchChange = (e) => {
        this.setState({ searchTerm: e.target.value });
    };

    handleSortChange = (e) => {
        const sortBy = e.target.value;
        const sortOrder = sortBy === this.state.sortBy ? (this.state.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        this.setState({ sortBy, sortOrder });
    };

    render() {
        const { searchTerm, sortBy, sortOrder } = this.state; // 获取搜索词
        return (
            <div className={Socialhomestyle.all}>
                <div className={"container " + Socialhomestyle.body}>
                    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div className="carousel-inner">
                            <div className={"carousel-item active " + Socialhomestyle.inside}>
                                <div className={Socialhomestyle.ratingchampion}>
                                    <img className={Socialhomestyle.ratingpost} src={require("../../img/carouselimg.jpg")} alt=""></img>
                                    <div className={Socialhomestyle.ratingword}>
                                        <p className={Socialhomestyle.ratingtitle}>本週評分最高</p>
                                        <h1 className={Socialhomestyle.ratingMN}>峰爆</h1>
                                        <h5 className={Socialhomestyle.ratingMEN}>Cloudy Mountain</h5>
                                        <div className={Socialhomestyle.ratingSC}>
                                            <Score score="5.0" /></div>
                                    </div>
                                </div>
                            </div>
                            <div className={"carousel-item " + Socialhomestyle.inside}>
                                <div className={Socialhomestyle.ratingchampion}>
                                    <img className={Socialhomestyle.ratingpost} src={require("../../img/THEEQUALIZER3.jpg")} alt=""></img>
                                    <div className={Socialhomestyle.ratingword}>
                                        <p className={Socialhomestyle.ratingtitle}>本週最多人評分</p>
                                        <h1 className={Socialhomestyle.ratingMN}>私刑教育3</h1>
                                        <h5 className={Socialhomestyle.ratingMEN}>THEEQUALIZER3</h5>
                                        <div className={Socialhomestyle.ratingSC}>
                                            <Score score="4.4" /></div>

                                    </div>
                                </div>
                            </div>
                            <div className={"carousel-item " + Socialhomestyle.inside}>
                                <div className={Socialhomestyle.ratingchampion}>
                                    <img className={Socialhomestyle.ratingpost} src={require("../../img/GranTurismo.jpg")} alt=""></img>
                                    <div className={Socialhomestyle.ratingword}>
                                        <p className={Socialhomestyle.ratingtitle}>綜合排名最高</p>
                                        <h1 className={Socialhomestyle.ratingMN}>闇黑新世界</h1>
                                        <h5 className={Socialhomestyle.ratingMEN}>New World</h5>
                                        <div className={Socialhomestyle.ratingSC}>
                                            <Score score="4.7" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div className="arr5">
                        <div className={Socialhomestyle.findmov}>
                            <input
                                type="text"
                                className={Socialhomestyle.findmovinput}
                                placeholder="  請輸入電影名稱"
                                aria-label="請輸入電影名稱"
                                aria-describedby="button-addon2"
                                value={this.state.searchTerm}
                                onChange={this.handleSearchChange}
                            >
                            </input>
                            <select
                                value={this.state.selectedFilter}
                                className={"form-select " + Socialhomestyle.formselect}
                                aria-label="Default select example"
                                onChange={(e) => this.setState({ selectedFilter: e.target.value })}
                            >
                                <option value="0">查詢範圍</option>
                                <option value="1">上映60天內</option>
                                <option value="2">上映120天內</option>
                                <option value="3">2023</option>
                                <option value="4">2022</option>
                                <option value="5">2021</option>
                                <option value="6">2020</option>
                            </select>
                            <select
                                value={sortBy}
                                className={"form-select " + Socialhomestyle.formselect}
                                aria-label="Default select example"
                                onChange={this.handleSortChange}
                            >
                                <option value="0">排序</option>
                                <option value="1">依喜好度排序</option>
                                <option value="2">依評分人數排序</option>
                                <option value="3">依上映日期排序</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className={Socialhomestyle.movieview}>
                            <h5 className={"col-4 " + Socialhomestyle.myh51}>電影名稱</h5>
                            <h5 className={"col-4 " + Socialhomestyle.myh5}>上映日期</h5>
                            <h5 className={"col-4 " + Socialhomestyle.myh5}>網友評分</h5>
                        </div>
                        <div className={Socialhomestyle.moviecomment}>
                            <Accordion
                                searchTerm={searchTerm}
                                selectedFilter={this.state.selectedFilter}
                                sortBy={sortBy}
                                sortOrder={sortOrder}
                            />
                        </div>
                    </div>
                </div >
            </div >

        )
    }
}

export default Socialhome;