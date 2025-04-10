drop database GestorServicios
create database GestorServicios

use GestorServicios


create table Tipos_DNI 
(
	cod_dni varchar(20) not null,
	desc_tipo_dni varchar(45) not null,

	constraint PK__Tipos_DNI primary key (cod_dni)
)
go

create table Dueños
(
	dni varchar(30) not null,
	cod_dni varchar(20) not null,

	nombre varchar(30) not null,
	apellido varchar(30) not null,
	fecha_nac date not null,

	constraint PK__Dueños primary key (dni,cod_dni),
	constraint FK__Dueños__Tipos_DNI foreign key (cod_dni) references Tipos_DNI
)
go

create table Plantas
(
	nro_planta varchar(20) not null,
	nom_planta varchar(20) not null,

	constraint PK__Plantas primary key (nro_planta)
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
	cod_propiedad varchar(40) not null,
	nombre varchar(50) not null,
	calle varchar(50) not null,
	altura varchar(5) not null,
	nro_depto varchar(5)  null,
	nro_planta varchar(20) null,
	nro_localidad smallint not null,
	dni varchar(30) not null,
	cod_dni varchar(20) not null,


	constraint PK__Propiedades primary key (cod_propiedad),
	constraint FK__Propiedades__Plantas foreign key (nro_planta) references Plantas,
	constraint FK__Propiedades__Localidades foreign key (nro_localidad) references Localidades,
	constraint FK__Propiedades__Dueños foreign key (dni, cod_dni) references Dueños


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
	cod_propiedad varchar(40) not null,
	nro_empresa smallint not null,	
	cod_servicio varchar(15) not null,
	fecha_alta date null,
	fecha_fin date null,
	nro_cuenta smallint not null,

	constraint PK__ServiciosEmpresas_Propiedades primary key(cod_propiedad, nro_empresa, cod_servicio),
	constraint FK__ServiciosEmpresas_Propiedades__Propiedades foreign key (cod_propiedad) references Propiedades,
	constraint FK__ServiciosEmpresas_Propiedades__Servicios_Empresas foreign key (nro_empresa, cod_servicio) references Servicios_Empresas
)
go

create table Facturas
(
	cod_factura varchar (50) not null,
	cod_propiedad varchar(40) not null,
	nro_empresa smallint not null,	
	cod_servicio varchar(15) not null,
	importe decimal (10,2) not null,
	fecha_venc date not null, 
	pago varchar(2) not null default 'n',

	constraint PK__Facturas primary key (cod_factura),
	constraint FK__Facturas__Servicios_Empresas foreign key (cod_propiedad, nro_empresa, cod_servicio) references ServiciosEmpresas_Propiedades,
	
	constraint CK__Propiedades_Pago check (pago  in ('s', 'n'))
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

insert into Tipos_DNI (cod_dni, desc_tipo_dni)
values ('DNI' , 'Documento Nacional de Identidad')
go

insert into Dueños (dni, cod_dni, nombre, apellido, fecha_nac)
values
('24585150', 'DNI', 'Silvia', 'Dellamaggiore', '1976-02-03'),
('000', 'DNI', 'Celia', 'Garetto', '1940-06-21')
go

insert into Plantas (nro_planta, nom_planta)
values (1, 'PB')
go

insert into Propiedades (cod_propiedad, nombre, calle, altura, nro_depto, nro_planta, nro_localidad, dni, cod_dni)
values ('PROP1', 'Depto. Fragueiro', 'Mariano Fragueiro', '343', '4', 1, 2, '000', 'DNI')
go

insert into Propiedades (cod_propiedad, nombre, calle, altura, nro_localidad, dni, cod_dni)
values ('PROP2', 'Casa Abuela', 'Leopoldo Lugones', '1255', 1, '24585150', 'DNI'),
('PROP3', 'Casa Rio 3', 'Leopoldo Lugones', '952', 2, '24585150', 'DNI')
go


insert into Empresas (nro_empresa, nom_empresa)
values (1, 'EPEC'),
(2, 'Ecogas'),
(3, 'Cooperativa Rio Tercero'),
(4, 'Administracion Fragueiro'),
(5, 'Fibertel')
go

insert into Servicios (cod_servicio, nom_servicio)
values ('LYA', 'Luz y Agua'),
('GA', 'Gas'),
('EX', 'Expensas'),
('IT', 'Internet y Telefonia')
go

insert into Servicios_Empresas (nro_empresa, cod_servicio)
values (1, 'LYA'),
(2, 'GA'),
(3, 'LYA'),
(3,'IT'),
(4, 'EX'),
(5,'IT')
go


insert into ServiciosEmpresas_Propiedades (cod_propiedad, nro_empresa, cod_servicio, fecha_alta, fecha_fin, nro_cuenta)
values ('PROP3', 3, 'LYA', null, null, 1),
('PROP3', 3, 'IT', null, null, 2),
('PROP3', 2, 'GA', null, null, 1)

insert into Facturas (cod_factura, nro_empresa, cod_servicio, importe, fecha_venc, cod_propiedad, pago)
values ('1', 3, 'LYA', 135388.29, '2025-04-07','PROP3' , 'n' )
go

select * from Facturas

go 
-- Manejador de datos
CREATE or alter PROCEDURE ObtenerFuturosVencimientos
AS
BEGIN
    SELECT 
        f.cod_factura,
        f.importe,
        f.fecha_venc,
        p.nombre AS nombre_propiedad,
        p.calle,
        p.altura,
        s.nom_servicio,
        e.nom_empresa
    FROM Facturas f
    JOIN Propiedades p ON f.cod_propiedad = p.cod_propiedad
    JOIN Servicios s ON f.cod_servicio = s.cod_servicio
    JOIN Empresas e ON f.nro_empresa = e.nro_empresa
    WHERE 
        f.fecha_venc >= CAST(GETDATE() AS DATE)  -- Vencimientos a partir de hoy
        AND f.pago = 'n'                         -- No pagadas
    ORDER BY 
        f.fecha_venc ASC;                        -- Ordenadas por fecha de vencimiento
END;
GO


exec ObtenerFuturosVencimientos