using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace APS.Repository
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<TEntity> AddAsync(TEntity entity);
        Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities);

        Task<TEntity> UpdateAsync(TEntity entity);
        Task<IEnumerable<TEntity>> UpdateRangeAsync(IEnumerable<TEntity> entities);

        Task RemoveAsync(TEntity entity);
        Task RemoveRangeAsync(IEnumerable<TEntity> entities);

        Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate);
        Task<int> CountAsync();

        IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate, bool eager = false);

        Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool eager = false);
        Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, string navigationPropertyInclude);
        Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate,
            string navigationPropertyInclude1, string navigationPropertyInclude2, string navigationPropertyInclude3);
        Task<TEntity> GetFirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool eager = false);

        Task<TEntity> GetAsync(int id);
        Task<TEntity> GetAsync(long id);
        Task<TEntity> GetAsync(string id);

        Task<IEnumerable<TEntity>> GetAllAsync();
        IQueryable<TEntity> GetAllAsQuerable();
        IQueryable<TEntity> GetAllAsQuerable(string navigationPropertyInclude);
        IQueryable<TEntity> GetAllAsQuerable(string navigationPropertyInclude1, string navigationPropertyInclude2);
    }
}
