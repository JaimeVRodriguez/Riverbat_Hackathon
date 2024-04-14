CREATE SEQUENCE IF NOT EXISTS track_decade_seq START WITH 1 INCREMENT BY 50;

CREATE SEQUENCE IF NOT EXISTS track_seq START WITH 1 INCREMENT BY 50;

CREATE TABLE track
(
    id         BIGINT NOT NULL,
    name       VARCHAR(255),
    artist     VARCHAR(255),
    image_path VARCHAR(255),
    url        VARCHAR(255),
    you_tubeid VARCHAR(255),
    mbid       VARCHAR(255),
    lyrics     TEXT,
    CONSTRAINT pk_track PRIMARY KEY (id)
);

CREATE TABLE track_decade
(
    id   INTEGER NOT NULL,
    name VARCHAR(255),
    CONSTRAINT pk_trackdecade PRIMARY KEY (id)
);