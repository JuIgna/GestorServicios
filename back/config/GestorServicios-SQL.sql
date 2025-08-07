drop database GestorServicios
create database GestorServicios

use GestorServicios


create table Dueños
(
	cuit varchar(50) not null,

	nombre varchar(30) not null,
	apellido varchar(30) not null,
	fecha_nac date not null,

	constraint PK__Dueños primary key (cuit)
)
go

create table Paises
(
	cod_pais varchar(15) not null,
	nom_pais varchar(20) not null,
	
	constraint PK__Paises primary key (cod_pais)
)
go

create table Provincias
(
	cod_provincia varchar(20) not null,
	cod_pais varchar(15) not null,
	nom_provincia varchar(20) not null,

	constraint PK__Provincias primary key (cod_provincia, cod_pais),
	constraint FK__Provincias__Paises foreign key (cod_pais) references Paises
)
go

create table Localidades
(
	nro_localidad smallint not null,
	nom_localidad varchar(30) not null,
	cod_provincia varchar(20) not null,
	cod_pais varchar(15) not null,

	constraint PK__Localidades primary key (nro_localidad),
	constraint FK__Localidades__Provincias foreign key (cod_provincia, cod_pais) references Provincias
)
go

create table Propiedades
(
	nro_propiedad int not null identity, 
	nombre varchar(50) not null,
	calle varchar(50) not null,
	altura varchar(5) not null,
	nro_localidad smallint not null,
	cuit varchar(50) not null,
	observaciones varchar (300) null,


	constraint PK__Propiedades primary key (nro_propiedad),
	constraint FK__Propiedades__Localidades foreign key (nro_localidad) references Localidades,
	constraint FK__Propiedades__Dueños foreign key (cuit) references Dueños

)
go


create table Empresas 
(
	nro_empresa smallint not null,
	nom_empresa varchar(40) not null,

	constraint PK__Empresas primary key (nro_empresa)

)
go

create table Servicios 
(
	cod_servicio varchar(15) not null,
	nom_servicio varchar(30) not null,

	constraint PK__Servicios primary key (cod_servicio)
)
go

create table Servicios_Empresas
(
	nro_empresa smallint not null,	
	cod_servicio varchar(15) not null,

	constraint PK__Servicios_Empresas primary key (nro_empresa, cod_servicio)
)
go

create table ServiciosEmpresas_Propiedades
(
	nro_propiedad int not null, 
	nro_empresa smallint not null,	
	cod_servicio varchar(15) not null,
	fecha_alta date null,
	fecha_fin date null,
	nro_cuenta smallint not null,

	constraint PK__ServiciosEmpresas_Propiedades primary key(nro_propiedad, nro_empresa, cod_servicio),
	constraint FK__ServiciosEmpresas_Propiedades__Propiedades foreign key (nro_propiedad) references Propiedades,
	constraint FK__ServiciosEmpresas_Propiedades__Servicios_Empresas foreign key (nro_empresa, cod_servicio) references Servicios_Empresas
)
go

create table Facturas
(
	nro_factura bigint not null identity,
	codBarra varchar(40) null,
	nro_propiedad int not null, 
	nro_empresa smallint not null,	
	cod_servicio varchar(15) not null,
	importe decimal (10,2) not null,
	fecha_venc date not null, 
	pago bit not null default 0,

	constraint PK__Facturas primary key (nro_factura),
	constraint FK__Facturas__Servicios_Empresas foreign key (nro_propiedad, nro_empresa, cod_servicio) references ServiciosEmpresas_Propiedades,
)
go

insert into paises (cod_pais, nom_pais)
values ('AR', 'Argentina')
go

insert into Provincias (cod_provincia, nom_provincia, cod_pais)
values ('CBA', 'Cordoba', 'AR')
go

insert into localidades (cod_pais, cod_provincia, nom_localidad, nro_localidad)
values ('AR', 'CBA', 'Rio Tercero', 1),
 ('AR', 'CBA', 'Cordoba Capital', 2)
 go

insert into Dueños (cuit, nombre, apellido, fecha_nac)
values
('24585150', 'Silvia', 'Dellamaggiore', '1976-02-03'),
('0000000', 'Celia', 'Garetto', '1940-06-21')
go

select * from Localidades

insert into Propiedades (nombre, calle, altura, nro_localidad, cuit, observaciones)
values ('Dpto. Fragueiro', 'Mariano Fragueiro', '343', 2, '24585150', 'Departamento Planta Baja 4 en Mariano Fragueiro')
go

insert into Propiedades (nombre, calle, altura, nro_localidad, cuit, observaciones)
values ('Casa Abuela', 'Leopoldo Lugones', '1255', 1, '24585150', 'Casa Abuela')
go

insert into Propiedades (nombre, calle, altura, nro_localidad, cuit, observaciones)
values ('Casa', 'Leopoldo Lugones', '952', 1, '24585150', 'Casa Nuestra')
go

-- EPEC, Ecogas, Cooperativa RioTel, Banco Roela, Fibertel

insert into Empresas (nro_empresa, nom_empresa)
values (1, 'EPEC'),
(2, 'Ecogas'),
(3, 'Cooperativa Rio Tercero'),
(4, 'Administracion Fragueiro'),
(5, 'Fibertel')
go

insert into Servicios (cod_servicio, nom_servicio)
values ('LYA', 'Luz y Agua'),
('GAS', 'Gas'),
('EXP', 'Expensas'),
('IT', 'Internet y Telefonia')
go

insert into Servicios_Empresas (nro_empresa, cod_servicio)
values (1, 'LYA'),
(2, 'GAS'),
(3, 'LYA'),
(3,'IT'),
(4, 'EXP'),
(5,'IT')
go

select * from ServiciosEmpresas_Propiedades
select * from Propiedades
select * from Empresas


insert into ServiciosEmpresas_Propiedades (nro_propiedad, nro_empresa, cod_servicio, fecha_alta, fecha_fin, nro_cuenta)
values (3, 3, 'LYA', null, null, 0),
(3, 3, 'IT', null, null, 0),
(3, 2, 'GAS', null, null, 0)

insert into ServiciosEmpresas_Propiedades (nro_propiedad, nro_empresa, cod_servicio, fecha_alta, fecha_fin, nro_cuenta)
values (2, 3, 'LYA', null, null, 0),
(2, 2, 'GAS', null, null, 0)

insert into ServiciosEmpresas_Propiedades (nro_propiedad, nro_empresa, cod_servicio, fecha_alta, fecha_fin, nro_cuenta)
values (1, 1, 'LYA', null, null, 0),
(1, 5, 'IT', null, null, 0),
(1, 2, 'GAS', null, null, 0),
(1, 4, 'EXP', null, null, 0)



select * from Facturas
select * from ServiciosEmpresas_Propiedades

-- casa
insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (3, 3, 'LYA', 118194.89, '2025-08-11')
go

insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (3, 2, 'GAS', 98708.07, '2025-08-11')
go

-- abuela
insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (2, 3, 'LYA', 32267.10, '2025-08-12')
go

insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (2, 2, 'GAS', 19939.21, '2025-08-11')
go

-- depto
insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (1, 1, 'LYA', 13614, '2025-08-06')
go

insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (1, 2, 'GAS', 8412.49, '2025-08-07')
go

insert into Facturas (nro_propiedad, nro_empresa, cod_servicio, importe, fecha_venc)
values (1, 4, 'EXP', 76898.55, '2025-08-11')
go


select * from Facturas

go 
-- Manejador de datos
CREATE or alter PROCEDURE ObtenerFuturosVencimientos
AS
BEGIN
    SELECT 
        f.nro_factura,
        f.importe,
        f.fecha_venc,
        p.nombre AS nombre_propiedad,
        p.calle,
        p.altura,
        s.nom_servicio,
        e.nom_empresa
    FROM Facturas f
    JOIN Propiedades p ON f.nro_propiedad = p.nro_propiedad
    JOIN Servicios s ON f.cod_servicio = s.cod_servicio
    JOIN Empresas e ON f.nro_empresa = e.nro_empresa
    WHERE 
        f.fecha_venc >= CAST(GETDATE() AS DATE)  -- Vencimientos a partir de hoy
        AND f.pago = 0                        -- No pagadas
    ORDER BY 
        p.nro_propiedad;                        -- Ordenadas por fecha de vencimiento
END;
GO

select * 


exec ObtenerFuturosVencimientos