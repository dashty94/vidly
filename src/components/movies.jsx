import React, { Component } from "react"

import ListGroup from "./common/listGroup"
import MoviesTable from "./moviesTable"
import Pagination from "./common/pagination"
import _ from "lodash"
import { getGenres } from "../services/fakeGenreService"
import { getMovies } from "../services/fakeMovieService"
import { paginate } from "../utils/paginate"

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 5,
        currentPage: 1,
        sortColumn: { path: "title", order: "asc" },
    }

    componentDidMount() {
        const genres = [{ _id: "", name: "All Genres" }, ...getGenres()]
        this.setState({ movies: getMovies(), genres })
    }

    handleLike = (movie) => {
        const movies = [...this.state.movies]
        const index = movies.indexOf(movie)
        movies[index] = { ...movies[index] }
        movies[index].liked = !movies[index].liked
        this.setState({ movies })
    }

    handleDelete = (movie) => {
        const movies = this.state.movies.filter((m) => m._id !== movie._id)
        this.setState({ movies })
    }

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    handleGenreSelect = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    handleSort = (sortColumn) => {
        this.setState({ sortColumn })
    }

    getPageDate = () => {
        const {
            pageSize,
            currentPage,
            movies: allMovies,
            selectedGenre,
            sortColumn,
        } = this.state
        // filtering data
        const filtered =
            selectedGenre && selectedGenre._id
                ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
                : allMovies
        // sorting data
        const sorted = _.orderBy(
            filtered,
            [sortColumn.path],
            [sortColumn.order]
        )
        // paginate data
        const movies = paginate(sorted, currentPage, pageSize)

        return { totalCount: filtered.length, data: movies }
    }

    render() {
        const { length: count } = this.state.movies
        const { pageSize, currentPage, sortColumn } = this.state

        if (count === 0) return <p>No movies in the databse</p>

        const { totalCount, data: movies } = this.getPageDate()

        return (
            <div className="row">
                <div className="col-3">
                    <ListGroup
                        items={this.state.genres}
                        selectedItem={this.state.selectedGenre}
                        onItemSelect={this.handleGenreSelect}
                    />
                </div>
                <div className="col">
                    <p>Showing {totalCount} movies in the databasse.</p>

                    <MoviesTable
                        movies={movies}
                        sortColumn={sortColumn}
                        onLike={this.handleLike}
                        onDelete={this.handleDelete}
                        onSort={this.handleSort}
                    />

                    <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                    />
                </div>
            </div>
        )
    }
}

export default Movies
