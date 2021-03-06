CREATE TABLE IF NOT EXISTS marcas (
	id INT unsigned NOT NULL AUTO_INCREMENT,
    nome varchar(45) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE marcas ADD status TINYINT(1) NOT NULL DEFAULT 1;

select * from marcas;

CREATE TABLE IF NOT EXISTS produtos (
	id INT(5) unsigned zerofill not null auto_increment,
    categoria tinyint(1) unsigned not null,
    modelo varchar(45) not null,
    capacidade int(4) unsigned not null,
	valor decimal(7,2) unsigned not null,
    marcas_id int unsigned not null,
    primary key (id),
    index fk_produdos_marcas_idx (marcas_id ASC),
    constraint fk_produto_marcas 
    foreign key (marcas_id)
    references marcas(id)
);

INSERT INTO marcas (nome) VALUES ('Eletrolux');
INSERT INTO marcas (nome) VALUES ('Brastemp');
INSERT INTO marcas (nome) VALUES ('Consul');
INSERT INTO marcas (nome) VALUES ('Semp Toshiba');
INSERT INTO marcas (nome) VALUES ('Acer');