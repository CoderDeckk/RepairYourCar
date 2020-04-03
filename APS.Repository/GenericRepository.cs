using APS.Domain.DBModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace APS.Repository
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly APSContext _dbContext;
        protected readonly DbSet<TEntity> _entities;
        public GenericRepository(APSContext dbContext)
        {
            _dbContext = dbContext;
            _entities = dbContext.Set<TEntity>();
            //_dbContext.CurrentUserId = httpAccessor?.HttpContext?.User?.Claims?.SingleOrDefault(c => c.Type == "id")?.Value;
        }

        public virtual async Task<TEntity> AddAsync(TEntity entity)
        {
            await _entities.AddAsync(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> AddRangeAsync(IEnumerable<TEntity> entities)
        {
            await _entities.AddRangeAsync(entities);
            await _dbContext.SaveChangesAsync();
            return entities;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            _entities.Update(entity);
            await _dbContext.SaveChangesAsync();
            return entity;
        }

        public virtual async Task<IEnumerable<TEntity>> UpdateRangeAsync(IEnumerable<TEntity> entities)
        {
            _entities.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
            return entities;
        }

        public virtual async Task RemoveAsync(TEntity entity)
        {
            _entities.Remove(entity);
            await _dbContext.SaveChangesAsync();
        }

        public virtual async Task RemoveRangeAsync(IEnumerable<TEntity> entities)
        {
            _entities.RemoveRange(entities);
            await _dbContext.SaveChangesAsync();
        }


        public virtual async Task<int> CountAsync()
        {
            return await _entities.CountAsync();
        }

        public virtual async Task<bool> AnyAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _entities.AnyAsync(predicate);
        }

        public virtual IEnumerable<TEntity> Find(Expression<Func<TEntity, bool>> predicate, bool eager = false)
        {
            return Query(eager).Where(predicate);
        }
        public virtual async Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool eager = false)
        {
            return await Query(eager).SingleOrDefaultAsync(predicate);
        }

        public virtual async Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, string navigationPropertyInclude)
        {
            return await _entities.Include(navigationPropertyInclude).SingleOrDefaultAsync(predicate);
        }

        public virtual async Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, string navigationPropertyInclude1,
            string navigationPropertyInclude2,
            string navigationPropertyInclude3)
        {
            return await _entities.Include(navigationPropertyInclude1).Include(navigationPropertyInclude2).Include(navigationPropertyInclude3).SingleOrDefaultAsync(predicate);
        }

        public virtual async Task<TEntity> GetFirstOrDefaultAsync(Expression<Func<TEntity, bool>> predicate, bool eager = false)
        {
            return await Query(eager).FirstOrDefaultAsync(predicate);
        }

        public virtual async Task<TEntity> GetAsync(int id)
        {
            return await _entities.FindAsync(id);
        }

        public virtual async Task<TEntity> GetAsync(long id)
        {
            return await _entities.FindAsync(id);
        }

        public virtual async Task<TEntity> GetAsync(string id)
        {
            return await _entities.FindAsync(id);
        }

        public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return await _entities.ToListAsync();
        }

        public virtual IQueryable<TEntity> GetAllAsQuerable()
        {
            return _entities.AsQueryable();
        }

        public virtual IQueryable<TEntity> GetAllAsQuerable(string navigationPropertyInclude)
        {
            return _entities.Include(navigationPropertyInclude).AsQueryable();
        }

        public virtual IQueryable<TEntity> GetAllAsQuerable(string navigationPropertyInclude1, string navigationPropertyInclude2)
        {
            return _entities.Include(navigationPropertyInclude1).Include(navigationPropertyInclude2).AsQueryable();
        }

        public virtual IQueryable<TEntity> Query(bool eager = false)
        {
            var query = _dbContext.Set<TEntity>().AsQueryable();
            if (eager)
            {
                foreach (var property in _dbContext.Model.FindEntityType(typeof(TEntity)).GetNavigations())
                    query = query.Include(property.Name);
            }
            return query;
        }

    }
}
