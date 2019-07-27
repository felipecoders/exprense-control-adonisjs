interface SchemaBuilder extends ChainableInterface<void> {
  createTable(
    tableName: string,
    callback: (tableBuilder: CreateTableBuilder) => any
  ): SchemaBuilder;
  createTableIfNotExists(
    tableName: string,
    callback: (tableBuilder: CreateTableBuilder) => any
  ): SchemaBuilder;
  alterTable(
    tableName: string,
    callback: (tableBuilder: CreateTableBuilder) => any
  ): SchemaBuilder;
  renameTable(oldTableName: string, newTableName: string): Promise<void>;
  dropTable(tableName: string): SchemaBuilder;
  hasTable(tableName: string): Promise<boolean>;
  hasColumn(tableName: string, columnName: string): Promise<boolean>;
  table(
    tableName: string,
    callback: (tableBuilder: AlterTableBuilder) => any
  ): Promise<void>;
  dropTableIfExists(tableName: string): SchemaBuilder;
  raw(statement: string): SchemaBuilder;
  withSchema(schemaName: string): SchemaBuilder;
  queryContext(context: any): SchemaBuilder;
}

declare interface TableBuilder {
  increments(columnName?: string): ColumnBuilder;
  bigIncrements(columnName?: string): ColumnBuilder;
  dropColumn(columnName: string): TableBuilder;
  dropColumns(...columnNames: string[]): TableBuilder;
  renameColumn(from: string, to: string): ColumnBuilder;
  integer(columnName: string, length?: number): ColumnBuilder;
  bigInteger(columnName: string): ColumnBuilder;
  text(columnName: string, textType?: string): ColumnBuilder;
  string(columnName: string, length?: number): ColumnBuilder;
  float(columnName: string, precision?: number, scale?: number): ColumnBuilder;
  decimal(
    columnName: string,
    precision?: number | null,
    scale?: number
  ): ColumnBuilder;
  boolean(columnName: string): ColumnBuilder;
  date(columnName: string): ColumnBuilder;
  dateTime(
    columnName: string,
    options?: { useTz?: boolean; precision?: number }
  ): ColumnBuilder;
  time(columnName: string): ColumnBuilder;
  timestamp(
    columnName: string,
    options?: { useTz?: boolean; precision?: number }
  ): ColumnBuilder;
  /** @deprecated */
  timestamp(
    columnName: string,
    withoutTz?: boolean,
    precision?: number
  ): ColumnBuilder;
  timestamps(
    useTimestampType?: boolean,
    makeDefaultNow?: boolean
  ): ColumnBuilder;
  binary(columnName: string, length?: number): ColumnBuilder;
  enum(
    columnName: string,
    values: Value[],
    options?: EnumOptions
  ): ColumnBuilder;
  enu(
    columnName: string,
    values: Value[],
    options?: EnumOptions
  ): ColumnBuilder;
  json(columnName: string): ColumnBuilder;
  jsonb(columnName: string): ColumnBuilder;
  uuid(columnName: string): ColumnBuilder;
  comment(val: string): TableBuilder;
  specificType(columnName: string, type: string): ColumnBuilder;
  primary(columnNames: string[], constraintName?: string): TableBuilder;
  index(
    columnNames: (string | Raw)[],
    indexName?: string,
    indexType?: string
  ): TableBuilder;
  unique(columnNames: (string | Raw)[], indexName?: string): TableBuilder;
  foreign(column: string, foreignKeyName?: string): ForeignConstraintBuilder;
  foreign(
    columns: string[],
    foreignKeyName?: string
  ): MultikeyForeignConstraintBuilder;
  dropForeign(columnNames: string[], foreignKeyName?: string): TableBuilder;
  dropUnique(columnNames: (string | Raw)[], indexName?: string): TableBuilder;
  dropPrimary(constraintName?: string): TableBuilder;
  dropIndex(columnNames: (string | Raw)[], indexName?: string): TableBuilder;
  dropTimestamps(): ColumnBuilder;
  queryContext(context: any): TableBuilder;
}

interface CreateTableBuilder extends TableBuilder {}

interface MySqlTableBuilder extends CreateTableBuilder {
  engine(val: string): CreateTableBuilder;
  charset(val: string): CreateTableBuilder;
  collate(val: string): CreateTableBuilder;
}

interface PostgreSqlTableBuilder extends CreateTableBuilder {
  inherits(val: string): CreateTableBuilder;
}

interface AlterTableBuilder extends TableBuilder {}

interface MySqlAlterTableBuilder extends AlterTableBuilder {}

interface PostgreSqlAlterTableBuilder extends AlterTableBuilder {}

interface ColumnBuilder {
  index(indexName?: string): ColumnBuilder;
  primary(constraintName?: string): ColumnBuilder;
  unique(indexName?: string): ColumnBuilder;
  references(columnName: string): ReferencingColumnBuilder;
  onDelete(command: string): ColumnBuilder;
  onUpdate(command: string): ColumnBuilder;
  defaultTo(value: Value): ColumnBuilder;
  unsigned(): ColumnBuilder;
  notNullable(): ColumnBuilder;
  nullable(): ColumnBuilder;
  comment(value: string): ColumnBuilder;
  alter(): ColumnBuilder;
  queryContext(context: any): ColumnBuilder;
}

interface ForeignConstraintBuilder {
  references(columnName: string): ReferencingColumnBuilder;
}

interface MultikeyForeignConstraintBuilder {
  references(columnNames: string[]): ReferencingColumnBuilder;
}

interface PostgreSqlColumnBuilder extends ColumnBuilder {
  index(indexName?: string, indexType?: string): ColumnBuilder;
}

interface ReferencingColumnBuilder extends ColumnBuilder {
  inTable(tableName: string): ColumnBuilder;
}

interface AlterColumnBuilder extends ColumnBuilder {}

interface MySqlAlterColumnBuilder extends AlterColumnBuilder {
  first(): AlterColumnBuilder;
  after(columnName: string): AlterColumnBuilder;
}
