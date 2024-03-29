USE [master]
GO
/****** Object:  Database [SchoolTask]    Script Date: 11-11-2022 18:48:24 ******/
CREATE DATABASE [SchoolTask]
GO
USE [SchoolTask]
GO
/****** Object:  Table [dbo].[mytable]    Script Date: 11-11-2022 18:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mytable](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NULL,
	[Email] [nvarchar](100) NULL,
	[Number] [int] NULL,
	[Password] [nvarchar](100) NULL,
	[Role] [nvarchar](50) NULL,
 CONSTRAINT [PK_mytable] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 11-11-2022 18:48:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Users] [nchar](10) NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[mytable] ON 

INSERT [dbo].[mytable] ([ID], [Name], [Email], [Number], [Password], [Role]) VALUES (1, N'testing', N'testing@gmail.com', 1234567890, N'12345678', N'Admin')
INSERT [dbo].[mytable] ([ID], [Name], [Email], [Number], [Password], [Role]) VALUES (2, N'Testing1', N'testing1@gmail.com', 1234567890, N'12345678', N'Admin')
SET IDENTITY_INSERT [dbo].[mytable] OFF
GO
USE [master]
GO
ALTER DATABASE [SchoolTask] SET  READ_WRITE 
GO
