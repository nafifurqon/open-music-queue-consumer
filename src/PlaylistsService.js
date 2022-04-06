const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistInfo(playlistId) {
    const query = 'SELECT p.id, p.name FROM playlists as p '
    + `WHERE p.id = '${playlistId}'`;

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = 'SELECT s.id, s.title, s.performer FROM playlists as p '
    + 'LEFT JOIN playlist_songs as ps ON ps.playlist_id = p.id '
    + 'LEFT JOIN songs as s ON s.id = ps.song_id '
    + `WHERE p.id = '${playlistId}'`;

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      return [];
    }

    return result.rows;
  }
}

module.exports = PlaylistsService;
